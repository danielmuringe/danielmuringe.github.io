#!/usr/bin/bash

# Activate sudo
echo $1 | sudo -S echo ''

# Change keyboard layout
sudo setxkbmap de

# Install apt packages
sudo apt update
sudo apt install -y git zsh

# Configure git
git config --global user.name DanielMuringe
git config --global user.email danielmuringe@gmail.com
git config --global init.defaultbranch main

# Install chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/chrome.list
sudo apt-get update
sudo apt-get install google-chrome-stable

# Install snaps
sudo snap install code --classic
sudo snap install node --classic
sudo snap install spotify --classic

# Remove unnecessary packages
sudo apt purge -y '*libreoffice*' '*thunderbird*' '*aisleriot*' '*gnome-todo*'
sudo apt autoremove -y
sudo snap remove firefox

# Create projects directory
mkdir  $HOME/projects

# Install pip
wget bootstrap.pypa.io/get-pip.py
python3 get-pip.py;
rm get-pip.py

# Install virtualenv
python3 -m pip install virtualenv pytest
sudo wget --show-progress -o /dev/null -O- 'https://raw.githubusercontent.com/hyperupcall/autoenv/master/scripts/install.sh' | sudo sh

# Create aliases
rc_config="\n# Add local bin to path\nexport PATH=$HOME/.local/bin:$PATH\n\n# Add zsh plugins\nexport plugins=(git zsh-autosuggestions zsh-syntax-highlighting)\nsource $ZSH/oh-my-zsh.sh\n\n# Create projects var\nPROJECTS=$HOME/projects\n\n#Add autoenv\nsource '/usr/local/lib/node_modules/@hyperupcall/autoenv/activate.sh'"

# Modify bash and zsh
echo -e $rc_config >> $HOME/.zshrc

# Add plugins
git clone https://github.com/zsh-users/zsh-autosuggestions.git $HOME/.oh-my-zsh/plugins/zsh-autosuggestions 
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $HOME/.oh-my-zsh/plugins/zsh-syntax-highlighting

# Install oh my zsh
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"

# Remove bredconfig.bash
rm ./bredconfig.bash
