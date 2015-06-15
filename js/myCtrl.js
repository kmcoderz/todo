app.controller('myCtrl',function($scope,localStorageService){
	$scope.init=function(){
		if(!localStorageService.get("todoList")){
			$scope.tasks=[];	
			$scope.cHigh=0;
			$scope.cMedium=0;
			$scope.cLow=0;
		}
		else{
			$scope.cHigh=localStorageService.get("cHigh");
			$scope.cMedium=localStorageService.get("cMedium");
			$scope.cLow=localStorageService.get("cLow");
			$scope.tasks=localStorageService.get("todoList");	
		}
		$scope.newTask="";
		$scope.show="All";
		$scope.priority="High";
		$scope.disableAdd=false;	
	}
	$scope.addTask=function(){
		$scope.disableAdd=true;
		if($scope.newTask!=""){
			$scope.tasks.push({task:$scope.newTask,date:Date.now(),isDone:false,priority:$scope.priority});
			$scope.newTask="";
			if($scope.priority==='High')
				$scope.cHigh++;
			else
			if($scope.priority==='Medium')
				$scope.cMedium++;	
			else
			if($scope.priority==='Low')
				$scope.cLow++;
		}
		$scope.disableAdd=false;
	};
	$scope.deleteTodo=function(task){
		$scope.disableAdd=true;
		var index=$scope.tasks.indexOf(task);
		if(index!=-1){
			$scope.tasks.splice(index, 1);
			if($scope.priority==='High')
				$scope.cHigh--;
			else
			if($scope.priority==='Medium')
				$scope.cMedium--;	
			else
			if($scope.priority==='Low')
				$scope.cLow--;
		}
		$scope.disableAdd=false;
	};
	$scope.showFn=function(x){
		if($scope.show=='All')
			return true;
		else
		if(x.isDone && $scope.show==='Complete')
			return true;
		else
		if(!x.isDone && $scope.show==='Pending')
			return true;
		else
			return false;
	};
	$scope.priorityFn=function(x){
		if($scope.priority==='High' && x.priority==='High')
			return true;
		else
		if($scope.priority==='Medium' && x.priority==='Medium')
			return true;
		else
		if($scope.priority==='Low' && x.priority==='Low')
			return true;
		else
			return false;
	};
	$scope.$watch("tasks",function  (newVal,oldVal) {
		if (newVal !== null && angular.isDefined(newVal) && newVal!==oldVal) {
			localStorageService.clearAll();
			localStorageService.add("todoList",angular.toJson($scope.tasks));
			localStorageService.add("cHigh",$scope.cHigh);
			localStorageService.add("cMedium",$scope.cMedium);
			localStorageService.add("cLow",$scope.cLow);
		}
	},true);
});
