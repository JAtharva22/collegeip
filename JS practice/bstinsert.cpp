#include <iostream>
using namespace std;

class BST
{
    int data;
    BST *left, *right;

public:
    // Default constructor.
    BST()
    {
        data = 0;
        left = right = NULL;
    };
    // Parameterized constructor.
    BST(int value)
    {
        data = value;
        left = right = NULL;
    };

    // Insert function.
    BST *Insert(BST *root, int value)
    {
        if (!root)
        {
            // Insert the first node, if root is NULL.
            return new BST(value);
        }

        // Check for duplicate values.
        if (value == root->data)
        {
            return root;
        }

        // Insert data.
        if (value > root->data)
        {
            // Insert right node data, if the 'value'
            // to be inserted is greater than 'root' node data.

            // Process right nodes.
            root->right = Insert(root->right, value);
        }
        else
        {
            // Insert left node data, if the 'value'
            // to be inserted is smaller than or equal to 'root' node data.

            // Process left nodes.
            root->left = Insert(root->left, value);
        }

        // Return 'root' node, after insertion.
        return root;
    };

    // Inorder traversal.
    void Inorder(BST *root)
    {
        if (!root)
        {
            return;
        }
        Inorder(root->left);
        cout << root->data << endl;
        Inorder(root->right);
    };

    // Destructor.
    ~BST()
    {
        delete left;
        delete right;
    }
};

// Driver code
int main()
{
    BST bst;
    BST *root = NULL;
    root = bst.Insert(root, 50);
    root = bst.Insert(root, 30);
    root = bst.Insert(root, 20);
    root = bst.Insert(root, 40);
    root = bst.Insert(root, 70);
    root = bst.Insert(root, 60);
    root = bst.Insert(root, 80);

    bst.Inorder(root);

    // Free the memory allocated to the BST nodes.
    delete root;

    return 0;
}
