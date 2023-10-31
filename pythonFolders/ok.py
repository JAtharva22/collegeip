# a = ' Mr 3ohn Smith '
# b = []
# j = 0
# for i in range(len(a)):
#     if a[i] == ' ':
#         b.append(a[slice(j+1,i)])
#         j = i
# c = a[0]
# for i in range(len(b)):
#     if i != len(b)-1:
#         c = c + b[i] + '%20'
#     else:
#         c += b[i]

# print(c)

class Node:
    def __init__(self, val):
        self.val = val
        self.next = None
        
class LL:
    def __init__(self):
        self.head = None
        
    def insertAtbeg(self, val):
        newNode = Node(val)
        newNode.next = self.head 
        self.head = newNode
        
    def insertInPos(self, val, pos):
        newnode = Node(val)
        
        if self.head is None:
            self.head = newnode
            return
        
        temp = self.head
        for i in range(pos - 1):
            if temp.next is not None:
                 temp = temp.next
            else:
                break
        
        newnode.next = temp.next
        temp.next = newnode
        
    def insertAtEnd(self, val):
        newnode = Node(val)
        
        if self.head is None:
            self.head = newnode
            return
        
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = newnode
        
    def delNode(self, pos):
        if self.head is None:
            return  # Return if the list is empty
    
        if pos == 0:
            self.head = self.head.next
            return  # Delete the head and return
    
        temp = self.head
    
        for i in range(pos - 1):
            if temp.next is not None:
                temp = temp.next
            else:
                return  # Return if the position is out of bounds
    
        if temp.next is not None:
            nodedel = temp.next
            temp.next = temp.next.next
            nodedel = None

    def delNodeEnd(self):
        if self.head is None:
            return  # Return if the list is empty
    
        temp = self.head
    
        if temp.next is None:
            self.head = None  # Special case: There is only one node, delete it
            return
    
        while temp.next.next:
            temp = temp.next
    
        delnode = temp.next
        temp.next = None
        delnode = None

    def printList(self):
        temp = self.head
        while (temp):
            print(str(temp.val) + " ", end=" -> ")
            temp = temp.next

head = LL()
head.insertAtEnd(0)
head.insertAtEnd(1)
head.insertAtEnd(2)
head.insertAtEnd(3)
head.insertAtEnd(4)

head.delNode(5)

head.printList()