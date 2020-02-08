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

function addComplaint(roomNumber) {
	console.log(`Adding ${roomNumber} to the complaints`)
	complaints.push(roomNumber)
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
		<h1>${building.name}</h1>
		<table class="table table-hover">
			<tbody>${
				building.layout.map((row, y) => `
					<tr>${
						row
							.map((roomNumber, x) => {
								const riskClass = roomNumber >= 0
									? pourcentageToRisk(building.noisyAppartments[y][x])
									: ""
								const room = roomToDisplay(roomNumber)
								return `<td class="${riskClass}" onclick="addComplaint(${roomNumber})">${room}</td>`
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
