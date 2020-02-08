"strict"

const ENTER_KEY = 13

const southCourt = [
	[-1, -1, -1, 404],
	[-1, 302, 303, 304],
	[201, 202, 203, 204],
	[101, 102, 103, 104]
]

const complaints = [
]

function getNoisyAppartments(building, complaints) {
	return building.map((row, floor) =>
		row.map((roomNumber, roomIndex) => {
			if (roomNumber < 0) return 0

			const neighboors = buildingNeighboors(building, {x: roomIndex, y: floor})

			if (neighboors.length == 0) return 0

			const totalCompaints = neighboors
					.map(room => complaints.includes(room))
					.map(complains => complains ? 1 : 0)
					.reduce((totalComplaints, complain) => totalComplaints + complain)

			return totalCompaints / neighboors.length
		})
	)
}

function buildingWidth(building) {
	return building.length
}

function buildingHeight(building) {
	return building[0].length
}

function buildingNeighboors(building, {x, y}) {
	const neighboors = []
	const add = ({dx, dy}) => {
		const neighboor = buildingRoom(building, {x: x+dx, y: y+dy})
		if (neighboor) neighboors.push(neighboor)
	}

	add({dx: -1, dy: 0})
	add({dx: 1, dy: 0})
	add({dx: 0, dy: -1})
	add({dx: 0, dy: 1})

	return neighboors
}

function buildingRoom(building, {x, y}) {
	if (x < 0 || x >= buildingWidth(building)) {
		return undefined
	}

	if (y < 0 || y >= buildingHeight(building)) {
		return undefined
	}

	if (building[y][x] < 0) {
		return undefined
	}

	return building[y][x]
}

function addComplaint() {
	console.log("Add complaint()")

	const roomNumber = parseInt(document.getElementById("room_input").value)
	if (isNaN(roomNumber)) {
		console.log("roomNumber is not a number")
		return
	}

	console.log(`Adding ${roomNumber} to the complaints`)

	document.getElementById("room_input").value = ""

	complaints.push(roomNumber)
	refresh()
}

function refresh() {
	const container = document.getElementById("appartment_map")

	const noisyAppartments = getNoisyAppartments(southCourt, complaints)

	container.innerHTML = `
		<ul>
			${
				complaints
						.map(room => `<li>${room}</li>`)
						.join("")
			}
		</ul>
		<table>
			<tbody>
			${
				southCourt.map((row, y) => `
					<tr>
						${
						row
							.map((roomNumber, x) => `
								<td style="background-color:${pourcentageToColor(noisyAppartments[y][x])}">
									${roomToDisplay(roomNumber)}
								</td>
							`)
							.join('')
						}
					</tr>
				`).join('')
			}
			</tbody>
		</table>
	`
}

function roomToDisplay(roomNumber) {
	return roomNumber < 0 ? "" : roomNumber
}

function pourcentageToColor(pourcentage) {
	return [
		{limit: 25,  color: "green"},
		{limit: 50,  color: "yellow"},
		{limit: 75,  color: "orange"},
		{limit: 100, color: "red"},
	]
		.find(level => pourcentage * 100 <= level.limit)
		.color
}

function lerpColor(pourcentage) {

	const green = {r:0, g:255, b:0}	
	const red = {r:255, g:0, b:0}

	const minus = (c1, c2) => {
		return {
			r: c1.r - c2.r,
			g: c1.g - c2.g,
			b: c1.b - c2.b
		}
	}

	const scale = (color, factor) => {
		return {
			r: color.r * factor,
			g: color.g * factor,
			b: color.b * factor
		}
	}

	const add = (c1, c2) => {
		return {
			r: c1.r + c2.r,
			g: c1.g + c2.g,
			b: c1.b + c2.b
		}
	}

	const color = add(green, scale(minus(red, green), pourcentage))

	return `rgb(${color.r}, ${color.g}, ${color.b})`
}

function onEnter(event) {
	if (event.keyCode !== ENTER_KEY) return

	console.log("Enter pressed inside")

	addComplaint()
}
