check_branch_name() {
  echo "⌛ Checking branch name..."
  branchName=$(git symbolic-ref --short HEAD)
  allowedPattern='^((feature|fix|release|chore|poc)\/[a-zA-Z0-9\-]+)$'

  if ! [[ $branchName =~ $allowedPattern ]]; then
    echo "❌ Checking branch name failed"
    exit 1
  fi
}

check_branch_name
