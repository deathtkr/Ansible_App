#!/usr/bin/env python
import json
import os
from azure.identity import DefaultAzureCredential
from azure.mgmt.compute import ComputeManagementClient

subscription_id = os.getenv('AZURE_SUBSCRIPTION_ID')
resource_group = os.getenv('AZURE_RESOURCE_GROUP')

credential = DefaultAzureCredential()
compute_client = ComputeManagementClient(credential, subscription_id)

def get_vms():
    vms = compute_client.virtual_machines.list(resource_group)
    inventory = {'_meta': {'hostvars': {}}}
    inventory['all'] = {'hosts': []}

    for vm in vms:
        hostname = vm.name
        inventory['all']['hosts'].append(hostname)
        inventory['_meta']['hostvars'][hostname] = {
            'ansible_host': vm.instance_view.public_ips[0] if vm.instance_view.public_ips else '127.0.0.1'
        }

    return inventory

if __name__ == '__main__':
    print(json.dumps(get_vms(), indent=2))
