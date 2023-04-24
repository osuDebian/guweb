# -*- coding: utf-8 -*-

import re

username = re.compile(r'^[\w \[\]-]{2,15}$')
email = re.compile(r'^[^@\s]{1,200}@[^@\s\.]{1,30}\.[^@\.\s]{1,24}$')

BEATMAP_PAGE = re.compile(r'https?:\/\/(debian.moe|osu.debian.moe)\/beatmapsets\/[0-9]+\#(osu|taiko|fruits|mania)\/([0-9]+)')