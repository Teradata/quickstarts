$vmName = If([System.Environment]::GetEnvironmentVariable('VM_NAME')) {[System.Environment]::GetEnvironmentVariable('VM_NAME')} Else {"Vantage Express"}
$diskDir = [System.Environment]::GetEnvironmentVariable('VM_IMAGE_DIR')
$disk1 = Get-ChildItem -Path $diskDir -Recurse -Filter "*disk1*"
$disk2 = Get-ChildItem -Path $diskDir -Recurse -Filter "*disk2*"
$disk3 = Get-ChildItem -Path $diskDir -Recurse -Filter "*disk3*"

#make sure ssh is enabled
Add-WindowsCapability -Online -Name OpenSSH.Client*

#add virtualbox bin to the path
$env:Path += ";C:\Program Files\Oracle\VirtualBox;c:\windows\system32\OpenSSH\"

Invoke-Expression "vboxmanage createvm --name `"$vmName`" --register --ostype openSUSE_64"
Invoke-Expression "vboxmanage modifyvm `"$vmName`" --ioapic on --memory 6000 --vram 128 --nic1 nat --graphicscontroller vmsvga --usb on --mouse usbtablet --clipboard-mode bidirectional  --draganddrop bidirectional"
Invoke-Expression "vboxmanage storagectl `"$vmName`" --name 'SATA Controller' --add sata --controller IntelAhci"
Invoke-Expression "vboxmanage storageattach `"$vmName`" --storagectl 'SATA Controller' --port 0 --device 0 --type hdd --medium `"$($disk1.FullName)`""
Invoke-Expression "vboxmanage storageattach `"$vmName`" --storagectl 'SATA Controller' --port 1 --device 0 --type hdd --medium `"$($disk2.FullName)`""
Invoke-Expression "vboxmanage storageattach `"$vmName`" --storagectl 'SATA Controller' --port 2 --device 0 --type hdd --medium `"$($disk3.FullName)`""
# this operation is necessary to work around a bug in `storageattach --type dvddrive --medium additions`
Invoke-Expression "vboxmanage storageattach `"$vmName`" --storagectl 'SATA Controller' --port 3 --medium emptydrive"
Invoke-Expression "vboxmanage storageattach `"$vmName`" --storagectl 'SATA Controller' --port 3 --type dvddrive --medium additions"
Invoke-Expression "vboxmanage modifyvm `"$vmName`" --natpf1 `"tdssh,tcp,,4422,,22`""
Invoke-Expression "vboxmanage modifyvm `"$vmName`" --natpf1 `"tddb,tcp,,1025,,1025`""
Invoke-Expression "vboxmanage startvm `"$vmName`" --type headless"

#advance through grub options to speed things up
Invoke-Expression "vboxmanage controlvm `"$vmName`" keyboardputscancode 1c 1c"

$n = 1
DO {
  Write-Host "Attempting to ssh into the vm. Attempt $n. This might take a minute."
  Invoke-Expression "ssh -p 4422 -o StrictHostKeyChecking=no root@localhost 'mount /dev/cdrom /media/dvd; /media/dvd/VBoxLinuxAdditions.run; echo `$?'"
  if($lastexitcode -eq '0') {
    break
  }

  Write-Host "Waiting 10 seconds before the next attempt."
  $n++
  Start-Sleep -s 10
} Until ($n -ge 10)

Invoke-Expression "vboxmanage controlvm `"$vmName`" acpipowerbutton"

$n = 1
DO {
  Write-Host "Checking if the vm is still running. Attempt $n. This might take a minute."
  $result = Invoke-Expression "vboxmanage showvminfo `"$vmName`""
  if(-Not (Select-String -InputObject $result  -pattern "running" -quiet)) {
    break
  }

  Write-Host "Waiting 10 seconds before the next attempt."
  $n++
  Start-Sleep -s 10
} Until ($n -ge 10)

Invoke-Expression "vboxmanage startvm `"$vmName`""
#advance through grub options to speed things up
Invoke-Expression "vboxmanage controlvm `"$vmName`" keyboardputscancode 1c 1c"
