# DevMinutes web

Czech podcast for developers. 

**Requirements (dev)**

1. Git
2. Node and npm  


### How to start development

```sh
# software preparation (bower and php server)
# software installation need do in administrator mode (sudo)
$ npm install -g bower gulp


$ git clone git@github.com:devminutes/devminutes-2.0.git
$ cd devminutes-2.0/
$ npm install
$ gulp devel
```

Go to browser and enter url *http://localhost:9090*


```sh
# build - minification, concatenation,...

$ gulp build
```


```sh
# bild and run server

$ gulp build-run
```

Go to browser and enter url *http://localhost:9090*
