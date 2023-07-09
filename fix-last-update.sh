#!/usr/bin/env bash
export TZ='Asia/Shanghai'
git ls-files -z | while read -d '' path; do
    touch -d "$(git log -1 --format="@%ct" "$path")" "$pth"
    printf "$(git log -1 --format="%ct" "$path" | xargs -I{} date -d @{} "+%Y-%m-%d %H:%M:%S")"
    printf \\t
    echo "$path"
done
