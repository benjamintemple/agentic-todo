/**
 * @generated SignedSource<<bdb9692a0f48e571b0f7b5a7c924c7ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type TaskStatus = "COMPLETED" | "PENDING" | "%future added value";
export type TaskListTaskChangedSubscription$variables = Record<PropertyKey, never>;
export type TaskListTaskChangedSubscription$data = {
  readonly taskChanged: {
    readonly createdAt: any;
    readonly description: string;
    readonly id: number;
    readonly status: TaskStatus;
    readonly title: string;
  };
};
export type TaskListTaskChangedSubscription = {
  response: TaskListTaskChangedSubscription$data;
  variables: TaskListTaskChangedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "taskChanged",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskListTaskChangedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TaskListTaskChangedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6419c22d35a499596a94093e5fe92d4b",
    "id": null,
    "metadata": {},
    "name": "TaskListTaskChangedSubscription",
    "operationKind": "subscription",
    "text": "subscription TaskListTaskChangedSubscription {\n  taskChanged {\n    id\n    title\n    description\n    status\n    createdAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e9e347f1f3009ee903a7c403c435fc6";

export default node;
