#!/usr/bin/env python3

import os, re
import requests

source_dir: str = 'source/_posts'
dest_dir: str = 'pic_backup'

for filename in os.listdir(source_dir):
    if filename.endswith('.md'):
        with open(source_dir + '/' + filename, 'r') as f:
            lines = f.readlines()
            for line in lines:
                if 'imgsrc.baidu.com' in line:
                    if 'https' in line:
                        line = line.replace('https', 'http')
                    url = re.findall(r'http://imgsrc.baidu.com/forum/pic/item/.*?\...g', line)[0]
                    r = requests.get(url)
                    filename = url.split('/')[-1]
                    with open(dest_dir + '/' + filename, 'wb') as f:
                        f.write(r.content)
                    print(filename + ' saved.')
