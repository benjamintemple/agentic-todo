/**
 * @generated SignedSource<<c78b6bbea7babf563f52c7447ba4ed8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type TaskListQuery$variables = Record<PropertyKey, never>;
export type TaskListQuery$data = {
  readonly allTasks: ReadonlyArray<{
    readonly createdAt: any;
    readonly description: string;
    readonly id: number;
    readonly status: TaskStatus;
    readonly title: string;
  }>;
};
export type TaskListQuery = {
  response: TaskListQuery$data;
  variables: TaskListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "allTasks",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TaskListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b1545c246ef7095632a4a93bb8a7e719",
    "id": null,
    "metadata": {},
    "name": "TaskListQuery",
    "operationKind": "query",
    "text": "query TaskListQuery {\n  allTasks {\n    id\n    title\n    description\n    status\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "d781fb64d352c67e8ff90af4e94eb322";

export default node;
