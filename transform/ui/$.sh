#!/usr/bin/env bash
[[ `uname` == 'Darwin' ]] && { [ -d "/usr/local/opt/coreutils/libexec/gnubin" ] || { echo "gnu tools not found"; exit 1; } && PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"; }
cd "$(dirname "$0")"
package_root="$(git rev-parse --show-toplevel)"

. ~/.nvm/nvm.sh --no-use
nvm use 8 > /dev/null
[[ "$(node --version)" == "v8"* ]] || {
	echo "couldn't change to node v8"
	exit 1
} && [ -d "${package_root}/src/ui" ] || {
	echo "src/ui doesn't exist"
	exit 1
} && time (
	rm -r "$package_root/dist/ui-build" 2> /dev/null

	node ./$.js &&
	./build/scenes/$.sh &&
	./build/styles/$.sh &&
	./build/scripts/$.sh &&
	./build/assets/$.sh
) || {
	echo "ui failed"
	exit 1
}