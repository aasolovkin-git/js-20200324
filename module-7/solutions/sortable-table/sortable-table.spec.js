import SortableTable from "./index";
import data from './__mocks__/products-data';

const header = [
  {
    id: 'images',
    title: 'Image',
    sortable: false,
    template: data => {
      return `
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${data[0].url}">
          </div>
        `;
    }
  },
  {
    id: 'title',
    title: 'Name',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'quantity',
    title: 'Quantity',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'status',
    title: 'Status',
    sortable: true,
    sortType: 'number',
    template: data => {
      return `<div class="sortable-table__cell">
        ${data > 0 ? 'Active' : 'Inactive'}
      </div>`;
    }
  },
];

describe("SortableTable", () => {
  it("should be rendered correctly", async () => {
    fetch.mockOnce(JSON.stringify(data));

    const sortableTable = new SortableTable(header, {
      url: 'api/rest/products'
    });

    document.body.append(sortableTable.element);

    expect(sortableTable.element).toBeVisible();
    expect(sortableTable.element).toBeInTheDocument();
  });

  it('should have ability to be destroyed', () => {
    sortableTable.destroy();

    expect(sortableTable.element).not.toBeInTheDocument();
  });
});
