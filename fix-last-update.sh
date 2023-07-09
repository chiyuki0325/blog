#!/usr/bin/env bash
export TZ='Asia/Shanghai'
git ls-files -z | while read -d '' path; do
    if [[ $path == source/_posts/* ]]; then
        if [[ "$(hostname)" != "yidaozhan-home" ]]; then
            touch -d "$(git log -1 --format="@%ct" "$path")" "$path"
        fi
        printf "$(git log -1 --format="%ct" "$path" | xargs -I{} date -d @{} "+%Y-%m-%d %H:%M:%S")"
        printf \\t
        echo "$path"
    fi
done
