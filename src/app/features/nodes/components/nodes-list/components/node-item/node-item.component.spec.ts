import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeItemComponent } from './node-item.component';
import { NodesListModule } from '../../nodes-list.module';
import { ColorNode } from '../../../../../../services/fake-socket/types/color-node';

describe('NodeChildComponent', () => {
  let component: NodeItemComponent;
  let fixture: ComponentFixture<NodeItemComponent>;
  let table: HTMLTableElement;
  const mockNode: ColorNode = { id: 'aa', color: '#ffffff' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeItemComponent ],
      imports: [NodesListModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeItemComponent);
    component = fixture.componentInstance;
    component.node = mockNode;
    fixture.detectChanges();
    table = fixture.nativeElement.querySelector('table');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Table has correct amount of columns', () => {
    expect(table).toBeTruthy();
    const tableHeaders = table.querySelectorAll('th');
    expect(tableHeaders.length).toBe(2);
  });

  it('Table has correct amount of rows', () => {
    expect(table).toBeTruthy();
    const tableRows = table.querySelectorAll('tr');
    expect(tableRows.length).toBe(2);
  });

  it('Node data renders correctly', () => {
    expect(table).toBeTruthy();
    const tableCells = table.querySelectorAll('td');
    expect(tableCells.length).toBe(2);
    expect(tableCells[0].textContent).toBe(mockNode.id);
    expect(tableCells[1].textContent).toBe(mockNode.color);
  });

  it('Td with color has proper background color', () => {
    expect(table).toBeTruthy();
    const tableCells = table.querySelectorAll('td');
    expect(tableCells.length).toBe(2);
    expect(tableCells[1].querySelector('span')?.style.backgroundColor).toBe('rgb(255, 255, 255)');
  });
});
