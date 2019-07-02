# Quill Tables Module - for quill 2.0
A module for Quill rich text editor to create tables using buttons. Tables must be added to quill configuration as so:
modules: {
            toolbar: [
                ['table']
            ],
            table: true
        }

FORKED FROM HERE:-
https://github.com/andrewcampey/quill-image-resize-module

# How to build:
npm install
npm install webpack webpack-cli --save-dev  # Don't know if this is really necessary
sudo apt install webpack
webpack -p --progress --colors  # -p is for uglifying
