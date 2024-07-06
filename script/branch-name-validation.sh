check_branch_name() {
  echo "⌛ Checking branch name..."
  branchName=$(git rev-parse --abbrev-ref HEAD)
  allowedPattern='^((feature|fix|release|chore|poc)\/[a-zA-Z0-9\-]+)$'

  if ! [[ $branchName =~ $allowedPattern ]]; then
    echo "❌ Branch name \"$branchName\" is not allowed!"
    exit 1
  fi
}

check_branch_name
