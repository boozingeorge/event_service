#!/bin/bash

# Set default vars
ENV=${ENV:-'dev'}
ROLE=${ROLE:-'all'}
CONNECTION_TYPE=${CONNECTION_TYPE:-'ssh'}
# Set workspace environment
WORKSPACE="$(cd "$(dirname "$0")/.." && pwd -P)" #"

ansible-playbook --sudo --inventory-file "${WORKSPACE}/ops-tools/ansible/inventory/esc.${ENV}" \
                 --extra-vars "env=${ENV} app_dir=/var/nodejs/esc workspace=${WORKSPACE}" \
                 --connection=${CONNECTION_TYPE} \
                 --vault-password-file=~/.ansible.vault \
                 "${WORKSPACE}/ops-tools/ansible/${ROLE}.yml"