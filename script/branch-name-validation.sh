#!/bin/sh

check_branch_name() {
  echo "⌛ Checking branch name..."
  local branchName="$1"
  local allowedPattern='^((feature|fix|release|chore|poc)\/[a-zA-Z0-9\-]+)$'

  if ! [[ $branchName =~ $allowedPattern ]]; then
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
