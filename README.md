# elm

elm nodejs express mysql raw test code

### Install
```sh
download the elm folder
cd elm
run npm install
```
### update the config.json file
```sh
{
	"HOST": "<db_hostname>",
	"USER": "<db_username>",
	"PASS": "<db_password>",
	"DB": "db_name"
}
```

### Import database files
## run below mentioned commands from native command prompt
```sh
mysql -u username -p dbname < eml_db.sql
mysql -u username -p dbname < elm_test_db.sql
```

# Configuration to run test on windows!
### modify package.hson 
```sh
 "scripts": {
    "start": "set NODE_ENV='' && node index.js",
    "test": "set NODE_ENV='test' && mocha --exit --timeout 15000 index.test.js"
  },
```
#### then run following command from the project directory
```sh
C:\<path>\elm>npm run test
```

# Configuration to run test on Linux!
### modify package.hson 
```sh
 "scripts": {
    "start": "export NODE_ENV='' && node index.js",
    "test": "export NODE_ENV='test' && mocha --exit --timeout 15000 index.test.js"
  },
```
#### then run following command from the project directory
```sh
$> /usr/<path>/elm/npm run test
```

#### execute project
```sh
Linux : $> /usr/<path>/elm/npm run start
windows : C:\<path>\elm>npm run start
```