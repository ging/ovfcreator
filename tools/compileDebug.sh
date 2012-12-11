#!/bin/bash
FILE=../build/ovfcreator.js
rm $FILE
cat ../src/OVF.js >> $FILE
