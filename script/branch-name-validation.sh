#!/bin/sh

check_branch_name() {
  echo "⌛ Checking branch name..."
  branchName="$1"
  allowedPattern='^((feature|fix|release|chore|poc)\/[a-zA-Z0-9\-]+)$'

  if ! echo "$branchName" | grep -Eq "$allowedPattern"; then
    echo "❌ Branch name \"$branchName\" is not allowed!"
    exit 1
  fi
}

if [ -z "$1" ]; then
  echo "Error: Branch name is required."
  exit 1
fi

branchName="$1"
check_branch_name "$branchName"
