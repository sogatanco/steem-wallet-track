var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Src/user.html",
        controller : "main"
    })
    .when("/exchanger", {
        templateUrl : "Src/exc.html",
        controller : "exc"
    });   
});

app.controller("main", function($scope) {   
  $scope.account=""; 
  $scope.loadHistory=function(){
    $scope.data=[];
    steem.api.getAccountHistory($scope.account, -1, 10000, (err, result) => {
    transfer=result.filter( tx => tx[1].op[0] === "transfer" )
    kirim=transfer.filter( tx => tx[1].op[1].from === $scope.account )
    terima=transfer.filter( tx => tx[1].op[1].to === $scope.account )
    $scope.penerima= kirim.map(x => x[1])
    $scope.pengirim= terima.map(x => x[1])
    $scope.data=result.map(x => x[1])
    $scope.$apply(); 
     });
  }
});

app.controller("exc",function($scope){
    $scope.exchange="";
    $scope.memo="";
    $scope.loadData=function(){
        $scope.semua=[];
        steem.api.getAccountHistory($scope.exchange, -1, 10000, (err, result) => {
            tran = result.filter( tx => tx[1].op[0] === "transfer" )
            ter= tran.filter( tx => tx[1].op[1].to === $scope.exchange )
            memo= ter.filter( tx => tx[1].op[1].memo === $scope.memo )
            $scope.tersangka=memo.map(x => x[1])
            $scope.semua=ter.map(x=> x[1])
            $scope.$apply();  
        });
    }
});



