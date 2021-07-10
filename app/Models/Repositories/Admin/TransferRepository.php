<?php


namespace App\Models\Repositories\Admin;


use App\Models\Transfer;

class TransferRepository implements Interfaces\RepositoryInterface
{

    public function all($search = null, $status = null)
    {
        return Transfer::when(!empty($status), function ($q) use ($status) {
            $q->where('status', $status);
        })->when(!empty($search), function ($q) use ($search) {
            $q->where('title', 'like', '%' . $search . '%')
                ->where('description', 'like', '%' . $search . '%');
        })->orderByDesc('id')->get();
    }

    public function get($id)
    {
        // TODO: Implement get() method.
    }

    public function delete($id)
    {
        // TODO: Implement delete() method.
    }

    public function update(array $data, $transfer)
    {
        if (empty($data['status']))
            unset($data['status']);

        if (empty($data['title']))
            unset($data['title']);

        if (empty($data['description']))
            unset($data['description']);

        if (empty($data['price']))
            unset($data['price']);

        $transfer->update($data);
        return Transfer::find($transfer->id);
    }

    public function create(array $data)
    {
        unset($data['_token']);

        $data['status'] = !empty($data['status']) ? 'active' : 'deactivate';

        if (empty($data['description']))
            unset($data['description']);

        return Transfer::create($data);
    }

    public function multipleDestroy($data)
    {
        return Transfer::whereIn('id', $data['transfersId'])->delete();
    }
}
