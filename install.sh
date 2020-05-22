#!/bin/bash

install_nodejs() {
    curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
    apt-get install -y nodejs
}
install_mongodb() {
    apt-get install gnupg
    wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
    apt-get update
    apt-get install -y mongodb-org
    systemctl daemon-reload
    systemctl enable mongod
    systemctl start mongod
}
install_pm2() {
    npm i pm2 -g
}

install_switch() {
    case $1 in
    mongo)
        install_mongodb
        ;;
    node)
        install_nodejs
        ;;
    pm2)
        install_pm2
        ;;
    build-essential)
        apt-get install -y build-essential
        ;;
    *)
        echo "Nothing to install"
        ;;
    esac

}
# This is the main function that runs
start_install() {
    # EUID is the Effective User ID, it changes for processes (not for the user) that the user executes that have set the setuid bit.
    # Since EUID changes for processes, check if the script runs as .

    if [[ $EUID -ne 0 ]]; then
        echo "This script must run as root()!"
        exit 1
    fi

    tools=(node mongo pm2 build-essential)

    for i in "${tools[@]}"; do
        if [ -x "$(command -v $i)" ]; then
            echo "$i already exists!"
        else
            echo "installing $i"
            install_switch $i
        fi
    done
}

start_install
