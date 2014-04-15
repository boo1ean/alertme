# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "precise64"
	config.vm.box_url = "http://files.vagrantup.com/precise64.box"

	# Setup shared dir with www-data owner
	config.vm.synced_folder ".", "/vagrant", :mount_options => ["dmode=777,fmode=777"]

	# Increase memory limit
	config.vm.provider "virtualbox" do |vb|
		vb.customize ["modifyvm", :id, "--memory", 1024]
	end
end
