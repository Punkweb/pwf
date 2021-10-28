import { jsx } from '../../../../lib';
import { API } from '../../services';

let categories = [];

function initHook(vnode) {
  API.Categories.list().then((res: any) => {
    categories = res.data.results;
  });
}

export default function Home() {
  return (
    <div
      class={{ container: true }}
      hook={{
        init: (vnode) => {
          initHook(vnode);
        },
      }}
    >
      <h1>Home Page</h1>
      <p>{categories.length}</p>
    </div>
  );
}
