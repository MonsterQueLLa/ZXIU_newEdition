/*TMODJS:{"version":1,"md5":"471d8dbd1d509f10e708383e090dbf99"}*/
template('login',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./tmp/login');
$out+=' ';
include('./tmp/footer');
$out+=' ';
return new String($out);
});