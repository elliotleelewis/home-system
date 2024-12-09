import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
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
	readonly blastGate = input.required<BlastGate>();

	readonly updateBlastGate = output<BlastGate>();
	readonly deleteBlastGate = output<BlastGate>();
	readonly activateBlastGate = output<BlastGate>();

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
