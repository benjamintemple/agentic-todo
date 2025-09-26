/**
 * @generated SignedSource<<719a7b9fb97e5fa10f509f6b9f99decb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type UpdateTaskStatusInput = {
  id: number;
  status: TaskStatus;
};
export type TaskListUpdateTaskStatusMutation$variables = {
  input: UpdateTaskStatusInput;
};
export type TaskListUpdateTaskStatusMutation$data = {
  readonly updateTaskStatus: {
    readonly id: number;
    readonly status: TaskStatus;
  };
};
export type TaskListUpdateTaskStatusMutation = {
  response: TaskListUpdateTaskStatusMutation$data;
  variables: TaskListUpdateTaskStatusMutation$variables;
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
    "name": "updateTaskStatus",
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
        "name": "status",
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
    "name": "TaskListUpdateTaskStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskListUpdateTaskStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bbc1bcbac44786a4c6586eee68368ea4",
    "id": null,
    "metadata": {},
    "name": "TaskListUpdateTaskStatusMutation",
    "operationKind": "mutation",
    "text": "mutation TaskListUpdateTaskStatusMutation(\n  $input: UpdateTaskStatusInput!\n) {\n  updateTaskStatus(input: $input) {\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "10e450d6108295a75ada0c7a1e84a8c2";

export default node;
