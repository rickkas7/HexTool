#!/bin/sh

rsync -r --checksum --exclude=.DS_Store release/* ../../docs-merge/docs/src/assets/files/device-restore


