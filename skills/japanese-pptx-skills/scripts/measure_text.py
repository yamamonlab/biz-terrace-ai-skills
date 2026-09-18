#!/usr/bin/env python3
"""Measure head-message width.

Uses Pillow with a supplied font when available; otherwise reports an East-Asian-width approximation.
"""
from __future__ import annotations
import argparse, unicodedata


def approx(text):
    return sum(2 if unicodedata.east_asian_width(ch) in {"W","F","A"} else 1 for ch in text)


def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("text")
    ap.add_argument("--font")
    ap.add_argument("--size", type=int, default=24)
    args=ap.parse_args()
    if args.font:
        try:
            from PIL import ImageFont
            f=ImageFont.truetype(args.font,args.size)
            box=f.getbbox(args.text)
            print({"pixels": box[2]-box[0], "font_size":args.size})
            return
        except Exception as e:
            print({"font_measurement_error":str(e),"approx_width_units":approx(args.text)})
            return
    print({"approx_width_units":approx(args.text),"fullwidth_char_equivalent":approx(args.text)/2})

if __name__ == "__main__":
    main()
