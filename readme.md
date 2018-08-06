## 使用步骤
###1.cd到工作目录
``` shell
cd ~/work/ximalaya
```
###2.clone项目
``` shell
git clone https://github.com/Ricuzy/jquery-es6-cli.git
```
###3.更改文件名
``` shell
mv jquery-cli test (test is the name of your name)
```
###4.删除.git
``` shell
cd test
rm -rf .git
```
###5.合并到远程创建的gitlab地址
```shell
git init
git remote add origin http://(your project remote address)
git add .
git commit -m'(message)'
git push -u origin master
```
###6.修改package.json的name&repository的URL
