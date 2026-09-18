#!/usr/bin/env python3
"""Static validator for Uchita DeckSpec v1.2.

Usage:
  python validate_spec.py deckspec.json
  python validate_spec.py deckspec.yaml

YAML input requires PyYAML. JSON works with the standard library.
"""
from __future__ import annotations
import argparse, json, re, sys, unicodedata
from pathlib import Path

STATES = {"RAW","EVIDENCE_READY","MESSAGE_READY","STORY_READY","VISUAL_READY","RENDERED","QA_PASSED"}
E_TYPES = {"fact","metric","opinion","hypothesis","decision","constraint","unknown"}
SEVERITY_ORDER = {"WARN":1,"ERROR":2,"BLOCKER":3}
PROHIBITED = ["本ページ","この1枚","——"]
JUDGMENT_HINTS = ["すべき", "べき", "必要", "見込め", "できる", "限られ", "値する", "左右しない", "ではなく", "にすぎ", "妥当", "検証すべき", "優先", "集中"]
ANALYTICAL_EXEMPT_ROLES = {"cover", "divider"}
EXTERNAL_TIERS = {"tier1_primary_official", "tier2_primary_research", "tier3_reputable_secondary", "tier4_anecdotal"}
VISUAL_STATES = {"VISUAL_READY","RENDERED","QA_PASSED"}
ANALYTICAL_ROLES = {"summary","context","analysis","recommendation","decision"}
BREATHING_ROLES = {"cover","divider"}


def load(path: Path):
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".json":
        return json.loads(text)
    try:
        import yaml
    except ImportError:
        raise SystemExit("YAML input requires PyYAML. Use JSON or install pyyaml.")
    return yaml.safe_load(text)


def display_width(text: str) -> int:
    return sum(2 if unicodedata.east_asian_width(ch) in {"W","F","A"} else 1 for ch in text)


def issue(out, code, severity, stage, message, slide_id=None):
    item = {"code":code,"severity":severity,"stage":stage,"message":message}
    if slide_id:
        item["slide_id"] = slide_id
    out.append(item)


def is_external(e):
    src = e.get("source") or {}
    return bool(src.get("source_tier") in EXTERNAL_TIERS or src.get("organization") or src.get("url"))


def evidence_used_by_slide(slide):
    ids = set(slide.get("supporting_evidence") or [])
    for p in slide.get("proof_requirements") or []:
        ids.update(p.get("evidence_ids") or [])
    for b in ((slide.get("visual") or {}).get("body_elements") or []):
        ids.update(b.get("evidence_ids") or [])
        for db in b.get("data_bindings") or []:
            if db.get("evidence_id"):
                ids.add(db["evidence_id"])
    for c in ((slide.get("visual") or {}).get("callouts") or []):
        ids.update(c.get("evidence_ids") or [])
    return ids


def validate(doc):
    out=[]
    deck = doc.get("deck", doc)
    state = deck.get("state")
    spec_version = str(deck.get("spec_version") or "")
    if state not in STATES:
        issue(out,"X01","ERROR","qa",f"Invalid state: {state}")

    design = deck.get("design") or {}
    brand = deck.get("brand") or {}
    if spec_version == "1.2" and state in VISUAL_STATES:
        if not design.get("system"):
            issue(out,"DS01","ERROR","visual","DeckSpec v1.2 requires deck.design.system at VISUAL_READY or later")
        if brand.get("theme_profile") and not design.get("theme_profile"):
            issue(out,"DS08","WARN","visual","brand.theme_profile is legacy in v1.2; use design.theme_profile as canonical")
        for ex in design.get("exceptions") or []:
            if not (ex.get("scope") and ex.get("rule") and ex.get("reason")):
                issue(out,"DS07","ERROR","visual","Design exception requires scope, rule, and reason")

    role_geometry = {}
    evidence = deck.get("evidence") or []
    emap={}
    eids=[]
    for e in evidence:
        eid=e.get("id")
        if not eid:
            issue(out,"E00","ERROR","evidence","Evidence missing id")
            continue
        if eid in eids:
            issue(out,"E00","ERROR","evidence",f"Duplicate Evidence ID: {eid}")
        eids.append(eid)
        emap[eid]=e
        if e.get("type") not in E_TYPES:
            issue(out,"E00","ERROR","evidence",f"{eid}: invalid type {e.get('type')}")

        src=e.get("source") or {}
        num=e.get("numeric") or {}
        if e.get("type") == "metric":
            src_label=src.get("label") or src.get("organization")
            basis=num.get("calculation_basis")
            if not src_label and not basis:
                issue(out,"E03","ERROR","evidence",f"{eid}: metric has neither source nor calculation_basis")

        if num.get("is_estimate"):
            if not (num.get("estimate_method") or num.get("calculation_basis")):
                issue(out,"E05","ERROR","evidence",f"{eid}: estimate has neither estimate_method nor calculation_basis")
            if num.get("estimate_marker") not in {"†", None}:
                issue(out,"E05","WARN","evidence",f"{eid}: recommended estimate marker is †")

        if is_external(e):
            if not (src.get("organization") and src.get("title") and (src.get("year") or src.get("publication_date"))):
                issue(out,"E07","WARN","evidence",f"{eid}: external source identity is incomplete (organization/title/year or publication_date)")

        if e.get("status") != "confirmed" and e.get("usable_as") == "proof":
            issue(out,"E02","BLOCKER","evidence",f"{eid}: unconfirmed evidence cannot be used as proof")

    decisions = deck.get("decisions") or []
    dids=[d.get("id") for d in decisions if d.get("id")]
    slides=deck.get("slides") or []
    sids=[s.get("id") for s in slides if s.get("id")]
    if len(sids) != len(set(sids)):
        issue(out,"X02","ERROR","storyline","Duplicate Slide ID")

    for s in slides:
        sid=s.get("id") or "?"
        role=s.get("role")
        used_ids=evidence_used_by_slide(s)
        for eid in used_ids:
            if eid not in emap:
                issue(out,"E04","ERROR","message",f"Unknown evidence reference {eid}",sid)

        h=((s.get("head") or {}).get("text") or "").strip()
        if h:
            for token in PROHIBITED:
                if token in h:
                    issue(out,"H04","ERROR","message",f"Prohibited expression: {token}",sid)
            if "。" in h[:-1]:
                issue(out,"H06","ERROR","message","Head appears to contain multiple sentences",sid)
            nums=re.findall(r"(?<![A-Za-z])\d+(?:[.,]\d+)?%?",h)
            if len(nums)>2:
                issue(out,"H03","ERROR","message",f"Head contains {len(nums)} numeric tokens",sid)
            if role not in ANALYTICAL_EXEMPT_ROLES and not any(x in h for x in JUDGMENT_HINTS):
                issue(out,"H02","WARN","message","No obvious judgment term detected",sid)
            chars=len(h.rstrip("。"))
            if role not in ANALYTICAL_EXEMPT_ROLES and (chars < 30 or chars > 60):
                issue(out,"H07","WARN","message",f"Head length is {chars} characters; target 30-60",sid)
            w=display_width(h)
            if w > 112:
                issue(out,"R03","WARN","render",f"Head approximate display width {w} exceeds two-line target",sid)
        elif state not in {"RAW","EVIDENCE_READY"} and role not in ANALYTICAL_EXEMPT_ROLES:
            issue(out,"H01","ERROR","message","Head is empty",sid)

        prs=s.get("proof_requirements") or []
        visual=s.get("visual") or {}
        body=visual.get("body_elements") or []
        bids={b.get("id") for b in body if b.get("id")}
        callouts=visual.get("callouts") or []
        cids={c.get("id") for c in callouts if c.get("id")}

        if spec_version == "1.2" and state in VISUAL_STATES:
            render=s.get("render") or {}
            dc=render.get("design_contract") or {}
            if not dc:
                issue(out,"DS02","ERROR","visual","Missing render.design_contract for DeckSpec v1.2",sid)
            else:
                density=dc.get("density")
                if density not in {"analytical","breathing"}:
                    issue(out,"DS02","ERROR","visual",f"Invalid or missing design density: {density}",sid)
                elif role in BREATHING_ROLES and density != "breathing":
                    issue(out,"DS04","WARN","visual",f"Role {role} normally uses breathing density",sid)
                elif role in ANALYTICAL_ROLES and density != "analytical":
                    issue(out,"DS04","WARN","visual",f"Role {role} normally uses analytical density",sid)

                focus=dc.get("primary_focus")
                if role in {"summary","context","analysis","recommendation"} and focus != "head":
                    issue(out,"DS04","WARN","visual",f"Role {role} normally uses primary_focus=head",sid)

                emph=dc.get("emphasis_targets") or []
                if len(emph) > 2:
                    issue(out,"DS03","WARN","visual",f"{len(emph)} emphasis targets; target is 1-2",sid)
                valid_targets=bids|cids
                unknown=[x for x in emph if x not in valid_targets]
                if unknown:
                    issue(out,"DS02","ERROR","visual",f"Unknown emphasis target(s): {unknown}",sid)

                geo=dc.get("geometry_key")
                if not geo:
                    issue(out,"DS06","WARN","visual","design_contract has no geometry_key",sid)
                elif role:
                    role_geometry.setdefault(role, set()).add(geo)

                semantic=design.get("semantic_encoding") or {}
                if visual.get("forecast_present") and semantic.get("actual") and semantic.get("actual") == semantic.get("forecast"):
                    if not (dc.get("semantic_redundancy") or []):
                        issue(out,"DS05","ERROR","visual","Actual/forecast share encoding but no semantic_redundancy is defined",sid)
        for p in prs:
            for eid in p.get("evidence_ids") or []:
                if eid not in eids:
                    issue(out,"V02","ERROR","visual",f"Proof requirement references unknown evidence {eid}",sid)
            if state in {"VISUAL_READY","RENDERED","QA_PASSED"}:
                refs=p.get("body_element_ids") or []
                if not refs:
                    issue(out,"V02","ERROR","visual","Proof requirement has no body element mapping",sid)
                for bid in refs:
                    if bid not in bids:
                        issue(out,"V02","ERROR","visual",f"Unknown body element {bid}",sid)

        for b in body:
            for db in b.get("data_bindings") or []:
                eid=db.get("evidence_id")
                if not eid:
                    issue(out,"V03","ERROR","visual",f"Body element {b.get('id')} has data binding without evidence_id",sid)
                elif eid not in emap:
                    issue(out,"V03","ERROR","visual",f"Body element {b.get('id')} binds unknown evidence {eid}",sid)

            spec=b.get("spec") or {}
            bridge=spec.get("bridge") if spec.get("chart_kind")=="bridge" else None
            if bridge:
                try:
                    start=float(bridge["start"])
                    end=float(bridge["end"])
                    contribs=[float(x) for x in bridge.get("contributions",[])]
                    tol=float(bridge.get("tolerance",0.0001))
                    calc=start+sum(contribs)
                    if abs(calc-end)>tol:
                        issue(out,"N01","BLOCKER","qa",f"Bridge arithmetic mismatch: {start} + {sum(contribs)} = {calc}, end={end}",sid)
                except (KeyError, TypeError, ValueError):
                    issue(out,"N01","ERROR","qa","Bridge spec is incomplete or non-numeric",sid)

        for did in ((s.get("storyline") or {}).get("decision_ids") or []):
            if did not in dids:
                issue(out,"S03","ERROR","storyline",f"Unknown Decision ID {did}",sid)

        pat=visual.get("selected_pattern")
        if pat is not None and not visual.get("selection_reason"):
            issue(out,"V01","ERROR","visual","Pattern selected without selection_reason",sid)

        if visual.get("forecast_present"):
            enc=visual.get("forecast_encoding") or {}
            if not enc:
                issue(out,"V05","ERROR","visual","Forecast present without forecast_encoding",sid)
            else:
                if not enc.get("actual") or not enc.get("forecast"):
                    issue(out,"V05","ERROR","visual","Forecast encoding must define actual and forecast styles",sid)
                if not enc.get("boundary_label"):
                    issue(out,"V05","WARN","visual","Forecast encoding has no boundary label",sid)

        source_note=s.get("source_note") or {}
        used_estimates=[eid for eid in used_ids if eid in emap and (emap[eid].get("numeric") or {}).get("is_estimate")]
        if used_estimates and not source_note.get("estimate_disclaimer"):
            issue(out,"R05","ERROR","render",f"Estimate evidence used without estimate disclaimer: {sorted(used_estimates)}",sid)

        used_external=[eid for eid in used_ids if eid in emap and is_external(emap[eid])]
        if used_external and role not in ANALYTICAL_EXEMPT_ROLES:
            noted=set(source_note.get("evidence_ids") or [])
            missing=[eid for eid in used_external if eid not in noted]
            if missing:
                issue(out,"R06","ERROR","render",f"External evidence missing from source_note: {sorted(missing)}",sid)

    if spec_version == "1.2" and state in VISUAL_STATES:
        for role, keys in role_geometry.items():
            if len(keys) > 1 and role not in {"closing"}:
                issue(out,"DS06","WARN","render",f"Role {role} uses multiple geometry_key values: {sorted(keys)}")

    sent=[((s.get("head") or {}).get("sentence_pattern"), s.get("id"), s.get("role")) for s in slides]
    analytical=[x for x in sent if x[2] not in ANALYTICAL_EXEMPT_ROLES]
    for i in range(len(analytical)-2):
        if analytical[i][0] and analytical[i][0] == analytical[i+1][0] == analytical[i+2][0]:
            issue(out,"H08","WARN","message",f"Same sentence pattern across 3 adjacent analytical slides: {analytical[i][0]}",analytical[i+1][1])

    summaries=[s for s in slides if s.get("role")=="summary"]
    closings=[s for s in slides if s.get("role")=="closing"]
    if len(slides) > 1 and decisions:
        if not summaries:
            issue(out,"S04","ERROR","storyline","Multi-slide decision deck has no summary slide")
        if not closings:
            issue(out,"D01","ERROR","storyline","Multi-slide decision deck has no closing slide")
        if len(decisions) < 3 or len(decisions) > 6:
            issue(out,"S05","WARN","storyline",f"Decision count is {len(decisions)}; target is 3-6")
    if summaries and closings:
        sum_ids={did for s in summaries for did in ((s.get("storyline") or {}).get("decision_ids") or [])}
        clo_ids={did for s in closings for did in ((s.get("storyline") or {}).get("decision_ids") or [])}
        if sum_ids != clo_ids:
            issue(out,"S03","ERROR","storyline",f"Summary/Closing decision IDs differ: summary={sorted(sum_ids)} closing={sorted(clo_ids)}")

    return out


def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("spec", type=Path)
    ap.add_argument("--json", action="store_true", help="Print JSON")
    args=ap.parse_args()
    issues=validate(load(args.spec))
    if args.json:
        print(json.dumps(issues,ensure_ascii=False,indent=2))
    else:
        if not issues:
            print("PASS: no static issues detected")
        for x in issues:
            sid=f" [{x['slide_id']}]" if x.get('slide_id') else ""
            print(f"{x['severity']:7} {x['code']} {x['stage']}{sid}: {x['message']}")
    worst=max((SEVERITY_ORDER.get(x["severity"],0) for x in issues), default=0)
    sys.exit(1 if worst>=2 else 0)

if __name__ == "__main__":
    main()
