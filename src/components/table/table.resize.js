import { $ } from '@core/DQuery';

const minSize = {
	w: 40,
	h: 20,
};

function createLine (el, rootEl, isVertical = true) {
	const line = $.create('i', 'decorate-line');

	isVertical ? line.css({ height: rootEl.height + 'px' }) : line.css({ width: rootEl.width + 'px' });
	el.append(line);
}

function removeLine (el) {
	el.remove(el.find('.decorate-line').$el);
}

export function resizeHandler (e, rootEl) {
	return new Promise(resolve => {
		let isLock = true;
		const resizer = $(e.target);
		const resizeType = resizer.data.resize;

		const parent = resizer.closest('[data-type="resizable"]');
		const coords = parent.getMetrix();
		let val = 0;

		parent.addClass('is-drag');

		if (resizeType === 'col') {
			createLine(resizer, rootEl);
			document.onmousemove = (e) => {
				isLock = false;

				const delta = e.pageX - coords.right;
				val = coords.width + delta + 2;

				if (val >= minSize.w) resizer.css({ right: -delta + 'px' });
				else val = minSize.w;
			};
		} else {
			createLine(resizer, rootEl, false);
			document.onmousemove = (e) => {
				isLock = false;
				const delta = e.pageY - coords.bottom + scrollY;
				val = coords.height + delta + 2;

				if (val >= minSize.h) resizer.css({ bottom: -delta + 'px' });
				else val = minSize.h;
			};
		}

		document.onmouseup = (e) => {
			document.onmousemove = null;
			document.onmouseup = null;

			removeLine(resizer);

			parent.removeClass('is-drag');

			if (isLock) return;

			if (resizeType === 'col') {
				parent.css({ width: val + 'px' });

				const cells = rootEl.findAll(`[data-col="${parent.data.col}"]`);
				cells.forEach(el => el.style.width = val + 'px');

				resizer.css({ right: 0 });
			} else {
				parent.css({
					height: val + 'px',
				});
				resizer.css({ bottom: 0 });
			}

			resolve({
				val,
				id: parent.data[resizeType],
				type: resizeType,
			});
		};
	});
}
