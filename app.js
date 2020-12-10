var express= require("express"),
	bodyParser= require("body-parser"),
	mongoose=require("mongoose"),
	methodOverride= require("method-override"),
	app= express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/newTodo', {useNewUrlParser: true, useUnifiedTopology: true});

var todoSchema= new mongoose.Schema({
	data:String,
	created:{type:Date, default:Date.now}
});

var Todo= mongoose.model("Todo", todoSchema);

app.get("/", function(req, res){
	res.redirect("/todos");
});

app.get("/todos", function(req, res){
	Todo.find({}, function(err, foundTodo){
		if(err){
			console.log(err)
		} else{
			res.render("index", {todos:foundTodo});
		}
	});
});

app.post("/todos", function(req, res){
	Todo.create(req.body.todo, function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect("/todos")
		}
	});
});

app.get("/todos/:id/edit", function(req, res){
	Todo.findById(req.params.id, function(err, foundTodo){
		if(err){
			console.log(err)
		}else{
			res.render("edit", {todo:foundTodo});
		}
	});
});
	
	
app.put("/todos/:id", function(req, res){
	Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, updatedTodo){
		if(err){
			console.log(err)
		}else{
			res.redirect("/todos");
		}
	});
});

app.delete("/todos/:id", function(req, res){
	Todo.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/todos");
		}else{
			res.redirect("/todos");
		}
	});
});

app.listen("3000", function(){
	console.log("todo server has started");
});
