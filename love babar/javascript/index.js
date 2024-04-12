console.log("hello sir how are u ");

 // object create
let rectangle1 = {
	length: 1, 
	breadth: 2,

	draw: function() {
		console.log('draw');
	}
};
 
//factory function creation

function createRectangle(){
	return rectangle={
		length: 1,
		breadth: 2,
		draw: function(){
			console.log('drawing rectangle');
		}
	};
	// return rectangle;
}
rectangle.length;
rectangle.draw() ;

