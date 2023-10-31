class Graph:
    def __init__(self, v):
        self.v = v
        self.adjm = []
        for i in range(v):
            temp = []
            for j in range(v):
                temp.append(0)
            self.adjm.append(temp)

    def addEdge(self, s, e):
        self.adjm[s][e] = 1
        self.adjm[e][s] = 1

    def bfs(self, start):
        visited = [False] * self.v
        q = [start]
        visited[start] = True
        while q:
            vis = q[0]
            print(vis, end=" ")
            q.pop(0)
            for i in range(self.v):
                if (self.adjm[vis][i] == 1) and (not visited[i]):
                    q.append(i)
                    visited[i] = True

    def dfs(self, start, visited):
        print(start, end=" ")
        visited[start] = True
        for i in range(self.v):
            if (self.adjm[start][i] == 1) and (not visited[i]):
                self.dfs(i, visited)


v = 5

# Create the graph
G = Graph(v)
G.addEdge(0, 1)
G.addEdge(0, 2)
G.addEdge(1, 3)

# Perform BFS
visited = [False] * v
G.dfs(0, visited)
print()
G.bfs(0)
