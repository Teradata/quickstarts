#!/usr/bin/env bash

vboxmanage createvm --name "$VM_NAME" --register --ostype openSUSE_64
vboxmanage modifyvm "$VM_NAME" --ioapic on --memory 6000 --vram 128 --nic1 nat --graphicscontroller vmsvga --usb on --mouse usbtablet --clipboard-mode bidirectional
vboxmanage storagectl "$VM_NAME" --name "SATA Controller" --add sata --controller IntelAhci
vboxmanage storageattach "$VM_NAME" --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium  "$(find $DISK_DIR -name '*disk1*')"
vboxmanage storageattach "$VM_NAME" --storagectl "SATA Controller" --port 1 --device 0 --type hdd --medium  "$(find $DISK_DIR -name '*disk2*')"
vboxmanage storageattach "$VM_NAME" --storagectl "SATA Controller" --port 2 --device 0 --type hdd --medium  "$(find $DISK_DIR -name '*disk3*')"
VBoxManage storageattach "$VM_NAME" --storagectl "SATA Controller" --port 3 --medium emptydrive
vboxmanage storageattach "$VM_NAME" --storagectl "SATA Controller" --port 3 --type dvddrive --medium additions
vboxmanage modifyvm "$VM_NAME" --natpf1 "tdssh,tcp,,4422,,22"
vboxmanage startvm "$VM_NAME" --type headless

n=1
until [ "$n" -ge 10 ]
do
  echo "Attempting to ssh into the vm. Attempt $n. This might take a minute."
  ssh -p 4422 -o StrictHostKeyChecking=no root@localhost 'mount /dev/cdrom /media/dvd; /media/dvd/VBoxLinuxAdditions.run; echo $?' && break
  n=$((n+1))
  sleep 10
done

vboxmanage controlvm "$VM_NAME" acpipowerbutton

n=1
until [ "$n" -ge 10 ]
do
  echo "Checking if the vm is still running. Attempt $n. This might take a few seconds."
  vboxmanage showvminfo "$VM_NAME" | grep -c "running" | grep 0 && break
  n=$((n+1))
  sleep 10
done
vboxmanage startvm "$VM_NAME"
