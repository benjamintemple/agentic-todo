/**
 * @generated SignedSource<<ae0ba77a0fb7a3ca0a771c148f5e23f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type CreateTaskInput = {
  description: string;
  title: string;
};
export type NewTaskFormCreateTaskMutation$variables = {
  input: CreateTaskInput;
};
export type NewTaskFormCreateTaskMutation$data = {
  readonly createTask: {
    readonly createdAt: any;
    readonly description: string;
    readonly id: number;
    readonly status: TaskStatus;
    readonly title: string;
  };
};
export type NewTaskFormCreateTaskMutation = {
  response: NewTaskFormCreateTaskMutation$data;
  variables: NewTaskFormCreateTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewTaskFormCreateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewTaskFormCreateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d8739a3621197269bead9b07bfec062a",
    "id": null,
    "metadata": {},
    "name": "NewTaskFormCreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation NewTaskFormCreateTaskMutation(\n  $input: CreateTaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    description\n    status\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "54f2f78fdd990052d0558c97474ed13a";

export default node;
