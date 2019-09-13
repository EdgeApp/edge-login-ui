#!/usr/bin/env sh

tool="google-java-format-1.7-all-deps.jar"
url="https://github.com/google/google-java-format/releases/download/google-java-format-1.7/$tool"

# If the tool is missing, grab it from GitHub:
if [ ! -e "./$tool" ]; then
  curl -L -o "./$tool" "$url"
fi

java -jar "./$tool" --replace ./packages/edge-login-ui-rn/android/src/main/java/co/airbitz/AbcCoreJsUi/*.java
