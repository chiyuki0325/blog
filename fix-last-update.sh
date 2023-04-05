#!/usr/bin/env bash
git ls-files -z | while read -d '' path; do
    touch -d "$(git log -1 --format="@%ct" "$path")" "$path"
done
