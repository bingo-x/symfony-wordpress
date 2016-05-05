# symfony-wordpress
I will try to code wordpress with symfony

# configure database
edit parameters.yml "app/config/parameters.yml"

# configure apache
eidt http-vhosts.conf file with the following content:

\<VirtualHost *:80\>
ServerAdmin webmaster@dummy-host2.example.com
DocumentRoot "E:/project/symfony-wordpress/web-pc"
ServerName bibom.wp.com
ErrorLog "logs/dummy-host2.example.com-error.log"
CustomLog "logs/dummy-host2.example.com-access.log" common
\</VirtualHost\>

My system's windows.If you have any questions on other system like linux or Mac, please google "http-vhosts config". 