export = {
  version: "4.0",
  dataServices: {
    schema: [
      {
        namespace: "OData-Server",
        entityType: [
          {
            name: "Product",
            key: [
              {
                propertyRef: [
                  {
                    name: "id",
                  },
                ],
              },
            ],
            property: [
              {
                name: "QuantityPerUnit",
                type: "Edm.String",
                nullable: "false",
              },
              {
                name: "UnitPrice",
                type: "Edm.Decimal",
                nullable: "false",
              },
              {
                name: "id",
                type: "Edm.String",
                nullable: "false",
              },
              {
                name: "Name",
                type: "Edm.String",
                nullable: "false",
              },
              {
                name: "CategoryId",
                type: "Edm.String",
                nullable: "false",
              },
              {
                name: "Discontinued",
                type: "Edm.Boolean",
                nullable: "false",
              },
            ],
          },
          {
            name: "Category",
            key: [
              {
                propertyRef: [
                  {
                    name: "id",
                  },
                ],
              },
            ],
            property: [
              {
                name: "Description",
                type: "Edm.String",
                nullable: "false",
              },
              {
                name: "id",
                type: "Edm.String",
                nullable: "false",
              },
              {
                name: "Name",
                type: "Edm.String",
                nullable: "false",
              },
            ],
          },
        ],
        annotations: [
          {
            target: "OData-Server.Product/id",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Product identifier",
              },
              {
                term: "UI.ControlHint",
                string: "ReadOnly",
              },
            ],
          },
          {
            target: "OData-Server.Category/id",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Category identifier",
              },
              {
                term: "UI.ControlHint",
                string: "ReadOnly",
              },
            ],
          },
          {
            target: "OData-Server.Category",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Categories",
              },
            ],
          },
          {
            target: "OData-Server.Category/Name",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Category name",
              },
              {
                term: "UI.ControlHint",
                string: "ShortText",
              },
            ],
          },
          {
            target: "OData-Server.Product",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Products",
              },
            ],
          },
          {
            target: "OData-Server.Product/Name",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Product title",
              },
              {
                term: "UI.ControlHint",
                string: "ShortText",
              },
            ],
          },
          {
            target: "OData-Server.Product/QuantityPerUnit",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Product English name",
              },
              {
                term: "UI.ControlHint",
                string: "ShortText",
              },
            ],
          },
          {
            target: "OData-Server.Product/UnitPrice",
            annotation: [
              {
                term: "UI.DisplayName",
                string: "Unit price of product",
              },
              {
                term: "UI.ControlHint",
                string: "Decimal",
              },
            ],
          },
        ],
      },
      {
        namespace: "OData-Server-InitDb",
        action: {
          name: "initDb",
        },
        entityContainer: {
          name: "OData-ServerContext",
          entitySet: [
            {
              name: "Products",
              entityType: "OData-Server.Product",
            },
            {
              name: "Categories",
              entityType: "OData-Server.Category",
            },
          ],
          actionImport: {
            name: "initDb",
            action: "OData-Server-InitDb.initDb",
          },
        },
      },
    ],
  },
};
