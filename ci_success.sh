# cut latest tag - based on changelog
# issue a GitHub release
function release {
  # TODO git config user/email

  # get tag and release notes from changelog
  FILE=CHANGELOG.md
  MESSAGES=()
  BODY=""
  k=1
  while read line; do
    if [[ $k = 1 ]]; then
      # capture release version - for tag
      RELEASE="$line"
      RELEASE=${RELEASE:3}
    elif [ -z "$line" ]; then
      # stop on previous release
      break
    else
      # keep change for tag
      MESSAGES+=("-m \"$line\"")
      BODY+="$line\n"
    fi

    ((k++))
  done < $FILE

  # annotated tag and messages
  TAG="git tag -a v$RELEASE -m \"v$RELEASE\""
  ANNOTATIONS="${MESSAGES[@]}"

  # issue tag and push
  COMMAND="${TAG} ${ANNOTATIONS}"
  eval $COMMAND
  git push origin --tags

  # create GitHub release
  RELEASE_JSON="{\"tag_name\": \"v${RELEASE}\", \"target_commitish\": \"master\", \"name\": \"v${RELEASE}\", \"body\": \"${BODY}\"}"

  # issue github release
  curl --data "$RELEASE_JSON" -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/jonpitch/danger-brewing/releases?access_token=$GH_ACCESS_TOKEN
}

#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo "not yet implemented"
fi
