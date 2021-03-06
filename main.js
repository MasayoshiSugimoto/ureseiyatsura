"strict"

const ENTER_KEY = 13

const southCourt = [
	[-1, -1, -1, 404],
	[-1, 302, 303, 304],
	[201, 202, 203, 204],
	[101, 102, 103, 104]
]

let complaints = []

function getNoisyAppartments(building, complaints) {

	const neighboorMap = buildNeighboorsMap(building)

	const neighboorRelativeCoordinates = [
		{dx: -1, dy: 0},
		{dx: 1, dy: 0},
		{dx: 0, dy: -1},
		{dx: 0, dy: 1},
	]

	return building.map((row, floor) =>
		row.map((roomNumber, roomIndex) => {
			if (roomNumber < 0) return 0

			if (neighboorMap[floor][roomIndex] == 0) return 0

			const totalComplaints = neighboorRelativeCoordinates
					.map(({dx, dy}) => ({x: roomIndex+dx, y: floor+dy}))
					.map(roomCoordinates => buildingRoom(building, roomCoordinates))
					.filter(room => room !== undefined)
					.filter(room => complaints.includes(room))
					.length

			return totalComplaints / neighboorMap[floor][roomIndex]
		})
	)
}

function buildingWidth(building) {
	return building[0].length
}

function buildingHeight(building) {
	return building.length
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

function buildNeighboorsMap(building) {

	const neighboorsInfo = [
		{dx: -1, dy: 0},
		{dx: 1, dy: 0},
		{dx: 0, dy: -1},
		{dx: 0, dy: 1},
	]

	return building.map((floor, y) =>
		floor.map((roomIndex, x) => 
			neighboorsInfo
				.filter(neighboor => buildingRoom(building, {x: x+neighboor.dx, y: y+neighboor.dy}) !== undefined)
				.length		
		)
	)
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

function addComplaint(roomNumber) {
	if (complaints.includes(roomNumber)) {
		console.log(`Failed to add ${roomNumber} because it is already registered`)
	} else {
		console.log(`Adding ${roomNumber} to the complaints`)
		complaints.push(roomNumber)
	}
	refreshScreen()
}

function removeComplain(roomNumber) {
	console.log(`Removing ${roomNumber} from the complaints`)
	complaints = complaints.filter(x => x !== roomNumber)
	refreshScreen()
}

function addComplaintFromInput() {
	console.log("Add complaintFromInput()")

	const roomNumber = parseInt(document.getElementById("room_input").value)
	if (isNaN(roomNumber)) {
		console.log("roomNumber is not a number")
		return
	}
	document.getElementById("room_input").value = ""

	addComplaint(roomNumber)
}

function refreshScreen() {
	drawComplaintsList()
	drawBuildings()
}

function drawComplaintsList() {
	const container = document.getElementById("complaints_list")

	container.innerHTML = `
		<ul>
			${
				complaints
						.map(room => `<li>${room}</li>`)
						.join("")
			}
		</ul>`
}

function drawBuildings() {
	const container = document.getElementById("appartment_map")

	const buildings = BUILDINGS
		.map(building => ({
			name: building.name,
			layout: building.layout,
			noisyAppartments: getNoisyAppartments(building.layout, complaints)
		}))

	container.innerHTML = buildings.map(building => `
		<h2>${building.name}</h2>
		<table class="table table-hover">
			<tbody>${
				building.layout.map((row, y) => `
					<tr>${
						row
							.map((roomNumber, x) => {
								const riskClass = roomNumber >= 0
									? pourcentageToRisk(building.noisyAppartments[y][x])
									: ""
								const room = complaints.includes(roomNumber)
									? `<strong>${roomToDisplay(roomNumber)}</strong>`
									: roomToDisplay(roomNumber)
								return `<td class="${riskClass}" onclick="onClickAppartment(${roomNumber})">${room}</td>`
							}).join('')
					} </tr>
				`).join('')
			}</tbody>
		</table>
	`)
		.join("")
}

function roomToDisplay(roomNumber) {
	return roomNumber < 0 ? "" : roomNumber
}

function pourcentageToRisk(pourcentage) {
	return [
		{limit: 30,  color: "table-success"},
		{limit: 60,  color: "table-warning"},
		{limit: 100, color: "table-danger"},
	]
		.find(level => pourcentage * 100 <= level.limit)
		.color
}

function onEnter(event) {
	if (event.keyCode !== ENTER_KEY) return

	console.log("Enter pressed inside")

	addComplaintFromInput()
}

function onClickAppartment(roomNumber) {
	if (complaints.includes(roomNumber)) {
		removeComplain(roomNumber)
	} else {
		addComplaint(roomNumber)
	}
}
