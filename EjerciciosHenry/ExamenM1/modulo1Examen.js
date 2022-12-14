const { Queue, Stack, BinarySearchTree } = require('./DS.js')
//agregando funciones necesarias
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  add(value) {
    var newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return //this
  }
  remove() {
    if (!this.head) return undefined
    var current = this.head
    var newTail = current
    while (current.next) {
      newTail = current
      current = current.next
    }
    this.tail = newTail
    this.tail.next = null
    this.length--
    if (this.length === 0) {
      this.head = null
      this.tail = null
    }
    return current
  }
  shift() {
    if (!this.head) return undefined
    var currentHead = this.head
    this.head = currentHead.next
    this.length--
    if (this.length === 0) {
      this.tail = null
    }
    return currentHead
  }
  unshift(value) {
    var newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
      this.tail = this.head
    }
    newNode.next = this.head
    this.head = newNode
    this.length++
    return this
  }
  size() {
    return this.length
  }
  search(index) {
    if (index < 0 || index >= this.length) return null
    var counter = 0
    var current = this.head
    while (counter !== index) {
      current = current.next
      counter++
    }
    return current
  }
  set(index, value) {
    var foundNode = this.search(index)
    if (foundNode) {
      foundNode.value = value
      return true
    }
    return false
  }
  insert(index, value) {
    if (index < 0 || index > this.length) return false
    if (index === this.length) return !!this.add(value)
    if (index === 0) return !!this.unshift(value)

    var newNode = new Node(value)
    var prev = this.search(index - 1)
    var temp = prev.next
    prev.next = newNode
    newNode.next = temp
    this.length++
    return true
  }
  delete(index) {
    if (index < 0 || index >= this.length) return undefined
    if (index === 0) return this.shift()
    if (index === this.length - 1) return this.remove()
    var previousNode = this.search(index - 1)
    var removed = previousNode.next
    previousNode.next = removed.next
    this.length--
    return removed
  }

  switchPos(pos1, pos2) {
    if (pos1 >= this.length || pos2 >= this.length) return false
    if (pos1 < 0 || pos2 < 0) return false

    let storage1 = this.search(pos1).value
    let storage2 = this.search(pos2).value

    this.delete(pos1)
    this.insert(pos1, storage2)
    this.delete(pos2)
    this.insert(pos2, storage1)
    return true
  }
  reverse() {}
  print() {
    var arr = []
    var current = this.head
    while (current) {
      arr.push(current.value)
      current = current.next
    }
    return arr
  }
}

// ---- Linked List ----
//EJERCICIO 1
// Agregar el m??todo orderList al prototipo de LinkedList. Este m??todo deber?? ordenar los elementos de nuestra lista enlazada de menor a mayor.
// Ejemplo:
//     Suponiendo que la lista actual es: Head --> [4] --> [5] --> [1]
//     lista.orderList();
//     Ahora la lista quedar??a: Head --> [1] --> [4] --> [5]
// ACLARACI??N: Se debe ordenar la lista original y no una nueva.

LinkedList.prototype.orderList = function () {
  // Tu c??digo aca:
  //buble sort aplicado a linkedlist
  for (let i = this.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (this.search(j).value > this.search(j + 1).value) {
        this.switchPos(j, j + 1)
      }
    }
  }
}

// EJERCICIO 2
// Agregar al prototipo de LinkedList un m??todo reverseLinkedList que invierta el orden de los elementos de la lista.
// Ejemplo:
// let myList = Head --> [1] --> [2] --> [3] --> [4]
// myList.reverseLinkedList()
// myList = Head --> [4] --> [3] --> [2] --> [1]
LinkedList.prototype.reverseLinkedList = function () {
  // Tu c??digo aca:
  let node = this.head
  this.head = this.tail
  this.tail = node
  let next
  let prev = null
  for (let i = 0; i < this.length; i++) {
    next = node.next
    node.next = prev
    prev = node
    node = next
  }
  return this
}

// EJERCICIO 3
// Implementar la funci??n joinLinkedLists que, a partir de dos listas simplemente enlazadas
// del mismo tama??o retorne una nueva lista con los elementos de ambas listas
// Ejemplo:
//    Lista 1: Head --> [2] --> [8] --> [22] --> null
//    Lista 2: Head --> [6] --> [15] --> [4] --> null
//    joinLinkedList(linkedListOne, linkedListTwo)
//    Head --> [2] --> [6] --> [8] --> [15] --> [22] --> [4] --> null

//agregando funciones necesarias
function clone(obj) {
  return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj)
}

function joinLinkedList(linkedListOne, linkedListTwo) {
  // Tu c??digo aca:
  if (linkedListOne.length === 0 || linkedListTwo.length === 0) return null
  if (linkedListOne.length !== linkedListTwo.length) return null

  let copy1 = clone(linkedListOne)
  let copy2 = clone(linkedListTwo)
  const mergedList = new LinkedList()

  while (copy1.length > 0) {
    const temp1 = copy1.shift()
    mergedList.add(temp1.value)
    const temp2 = copy2.shift()
    mergedList.add(temp2.value)
  }
  return mergedList
}

// ---- Arboles Binarios ----
// EJERCICIO 4
// Implementar la funci??n searchMin que busque en nuestro arbol binario, el valor minimo.
// Ejemplo:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
//  Deber??a retornarnos 2
BinarySearchTree.prototype.searchMin = function () {
  let minValue = Infinity
  function helper(node) {
    if (node.left) {
      helper(node.left)
    } else if (node.left === null) {
      minValue = node.value
      return
    }
  }
  helper(this)
  return minValue
}

// EJERCICIO 5
// Implementar la funci??n createBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree.
// Ejemplo:
//    - Array[16,6,23,2,17,31,14,5];
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
function createBST(array) {
  // Tu c??digo aca:
  const newBst = new BinarySearchTree(array[0])
  for (let i = 1; i < array.length; i++) {
    newBst.insert(array[i])
  }
  return newBst
}

// ----- Closures -----
// EJERCICIO 6
// Implementar la funci??n passport que recibe como par??metro:
//  - Una edad m??nima para que las personas puedan ingresar a un pa??s
//  - El pa??s en cuesti??n
// La funci??n passport retorna una funci??n isAllowed, la cual recibir?? un arreglo de personas que quieren ingresar al pa??s, y retornar?? un nuevo arreglo con los admitidos (aquellos que cumplan con la edad requerida).
function passport(minAge, country) {
  // Tu c??digo aca:
  if (minAge < 18) return false

  return function isAllowed(arr) {
    const newArr = arr.filter(
      (persona) => persona.age >= minAge && persona.allowed.includes(country)
    )
    if (newArr.length === 0) return false

    return newArr
  }
}

// ---- Recursi??n ----
// EJERCICIO 7
// La funci??n countDeep recibe por par??metro un arreglo que contiene n??meros y/o arreglos (estos ??ltimos contienen, a su vez, m??s n??meros y/o arreglos), y retorna la cantidad de arreglos que hay en total, incluyendo al padre.
// Ejemplo:
// countDeep( [ 1, 2, 3, [ 4, [ 5, 6 ] ], 7, [ 8 ], 9] ) ----> Deber??a retornar 4
function countDeep(input) {
  // Tu c??digo aca:
  const cola = [input]
  let contador = 0

  function helper(queue) {
    if (queue.length === 0) return 0
    if (queue.length === 1 && typeof queue[0] == 'number') return 0

    let current = queue.shift()
    if (typeof current == 'number') {
      helper([...queue])
    } else {
      contador++
      if (queue.length > 0) helper([...queue, ...current])
      if (queue.length === 0) helper([...current])
    }
  }
  helper(cola)
  return contador
}

// EJERCICIO 8
// Implementar la funci??n isAncestor: debe determinar si dado dos nombres de personas las mismas
// son parientes o no (La primera debe ser ancestro de la segunda). La funci??n recibira un objeto
// que va a representar s??lo la parte femenina del "arbol genealogico" familiar y ser?? de la siguiente forma:
// const genealogyTree = {
//   "Mona Simpson": [],
//   "Marge Simpson": ["Lisa Simpson", "Maggie Simpson"],
//   "Jacqueline Bouvier": [ "Patty Bouvier", "Marge Simpson", "Selma Bouvier"],
//   "Patty Bouvier": [],
//   "Selma Bouvier": ["Ling Bouvier"],
//   "Edwina": ["Abigail Simpson"],
//   "Lisa Simpson": [],
//   "Maggie Simpson": [],
//   "Ling Bouvier": []
// }
// Ejemplo:
//  - Caso que devuelve true --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Maggie Simpson")
//  - Caso que devuelve false --> isAncestor(genealogyTree, "Jacqueline Bouvier", "Abigail Simpson")
//  [Observar los tests para otros casos]
var isAncestor = function (genealogyTree, ancestor, descendant) {
  // Tu c??digo aca: if (genealogyTree[ancestor].length === 0) return false
  let currentAncestor = ancestor
  let response = false

  function helper(currentAncestor) {
    if (genealogyTree[currentAncestor].length === 0) {
      return null
    }
    if (genealogyTree[currentAncestor].includes(descendant)) {
      response = true
      return null
    }
    genealogyTree[currentAncestor].map((e) => helper(e))
  }
  helper(currentAncestor)
  return response
}

// ---- Queue ----
// EJERCICIO 9
// Implementar la funci??n cardGame: a partir de dos Queues que va a recibir como par??emtro que
// van a representar mazos de cartas de dos jugadores debemos determinar quien va a ser el ganador
// de este juego que va a tener la siguiente din??mica:
// - Los jugadores tendr??n que defender su "Castillo" que contiene un total de 100 puntos de resistencia
// - Cada carta tendr?? puntos de ataque (attack) y puntos de defensa (defense)
// - Ambos jugadores van a sacar las dos primeras cartas de su mazo
//      * La primera carta ser?? su carta asignada para atacar
//      * La segunda carta ser?? su carta asignada para defender
// - La carta asignada para atacar del jugador uno se enfrentar?? contra la carta asignada para defender
//   del jugador dos y viceversa. Si el ataque supera los puntos de defensa el da??o sobrante ser?? aplicado
//   sobre el castillo.
// - El juego finaliza cuando alguno de los dos castillos se quede sin puntos de resistencia o cuando los mazos
//   se acaben. En este ??ltimo caso ganar?? aquel jugador que tenga mayor cantidad de puntos de resistencia
//   restantes en su castillo.
// La funci??n deber?? devolver un string indicando al ganador: 'PLAYER ONE' o 'PLAYER TWO' (Respetar may??sculas) o
// 'TIE' en el caso de empate
// NOTA: Ambos mazos contienen la misma cantidad de cartas
//
// Ejemplo:
// Los jugadores levantan 2 cartas cada uno.
// La primera carta del jugador uno va a atacar a la segunda carta del jugador dos
// La primer carta del jugador dos va a atacar a la segunda carta del jugador uno
//
// Primer carta del jugador 1 (ATAQUE) vs Segunda carta del jugador 2 (DEFENSA):
// {attack: 5, defense: 5} vs {attack: 5, defense: 26}
// Ataque 5 vs Defensa 20 --> 5 no supera 20 --> No hay da??o sobre el castillo
//
// Primer carta del jugador 2 (ATAQUE) vs Segunda carta del jugador 1 (DEFENSA):
// {attack: 20, defense: 26} vs {attack: 15, defense: 10}
// Ataque 20 vs Defensa 10 --> 20 supera a 10 --> Como hay 10 puntos de diferencia esa cantidad de da??o es aplicada
// al castillo del jugador 1
//
// Una vez terminada la ronda, se procede a repetir lo mismo con las siguientes 2 cartas de cada jugaodr hasta
// finalizar el juego.
function cardGame(queue1, queue2) {
  // Tu c??digo aca:
  if (queue1.size === 0 || queue2.size === 0) return null
  if (queue1.size !== queue2.size) return null
  let castillo1 = 100
  let castillo2 = 100
  while (queue1.size() > 0) {
    let { attack: ataque1 } = queue1.dequeue()
    let { defense: defensa1 } = queue1.dequeue()
    let { attack: ataque2 } = queue2.dequeue()
    let { defense: defensa2 } = queue2.dequeue()

    if (ataque1 > defensa2) {
      castillo2 -= ataque1 - defensa2
      if (castillo2 < 0) return 'PLAYER ONE'
    }

    if (ataque2 > defensa1) {
      castillo1 -= ataque2 - defensa1
      if (castillo1 < 0) return 'PLAYER TWO'
    }
  }
  if (castillo1 === castillo2) {
    return 'TIE'
  }
  if (castillo1 > castillo2) {
    return 'PLAYER ONE'
  }
  if (castillo2 > castillo1) {
    return 'PLAYER TWO'
  }
}

// ---- Algoritmos ----
// EJERCICIO 10
// Orden?? un arreglo de objetos usando un bubble sort pero con algunas particularidades.
// Adem??s del arreglo a ordenar la funci??n va a recibir como par??metro una funci??n
// que va a retornar 1 s?? no hay que ordenarlo y -1 en el caso de que si haya que ordenarlo.
// Ejemplo:
// var array = [
//   {name: 'Cristian', age: 26, height: 1.85},
//   {name: 'Dylan', age: 30, height: 1.75},
//   {name: 'Joaquin', age: 25, height: 1.77},
// ]
// specialSort(array, swapFunction) --> Retornar??a el siguiente array:
// [
//   {name: 'Cristian', age: 26, height: 1.77},
//   {name: 'Joaquin', age: 25, height: 1.85},
//   {name: 'Dylan', age: 30, height: 1.75},
// ]
function specialSort(arr, swapFunction) {
  // Tu c??digo aca:
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (swapFunction(arr[j], arr[j + 1]) === -1) {
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

module.exports = {
  passport,
  LinkedList,
  joinLinkedList,
  BinarySearchTree,
  countDeep,
  specialSort,
  createBST,
  isAncestor,
  cardGame,
  Queue,
}
