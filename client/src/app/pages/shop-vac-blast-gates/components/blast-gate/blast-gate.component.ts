import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type BlastGate } from '@app/schema';

@Component({
	selector: 'app-blast-gate',
	templateUrl: './blast-gate.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [FormsModule],
})
export class BlastGateComponent {
	@Input()
	blastGate!: BlastGate;

	@Output()
	readonly updateBlastGate: EventEmitter<BlastGate> =
		new EventEmitter<BlastGate>();

	@Output()
	readonly deleteBlastGate: EventEmitter<BlastGate> =
		new EventEmitter<BlastGate>();

	@Output()
	readonly activateBlastGate: EventEmitter<BlastGate> =
		new EventEmitter<BlastGate>();

	isMenuOpen = false;

	handleToggleBlastGate(blastGate: BlastGate): void {
		this.updateBlastGate.emit({
			...blastGate,
			isOpen: !blastGate.isOpen,
		});
	}

	handleDeleteBlastGate(blastGate: BlastGate): void {
		this.deleteBlastGate.emit(blastGate);
	}

	handleActivateBlastGate(blastGate: BlastGate): void {
		this.activateBlastGate.emit(blastGate);
	}

	handleSetIsMenuOpen(isMenuOpen: boolean): void {
		this.isMenuOpen = isMenuOpen;
	}
}
