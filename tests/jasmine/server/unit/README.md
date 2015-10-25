# README

## From the author of Velocity Jasmine on Server Unit Test Mode

Warning: Not recommended to use right now. The current implementation has several flaws and doesn''t support ES2015.

You should use the server integration mode to write your server unit tests for now, until

I have rewritten the implementation.

This mode is disabled by default. You need to enable it by setting the environment variable JASMINE_SERVER_UNIT=1.

    You can unit test server app code.

    The Meteor API and all packages are stubbed in this mode.

    Place your server unit tests in the folder tests/jasmine/server/unit/ or a subfolder of it.
