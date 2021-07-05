<?php


namespace App\Classes\Themes;


class PayloadHandler
{
    private $payload, $name, $subName, $result = null;

    public function __construct($payload, $name, $subName = null)
    {
        $this->payload = $payload;
        $this->name = $name;
        $this->subName = $subName;
        $this->result = $this->get();
    }

    function get()
    {
        $result = $this->searchInValue($this->payload, $this->name);
        if (empty($result))
            return null;
        if ($result->type == 'box' && !empty($this->subName)) {
            $result = $this->searchInValue($result->value, $this->subName);
            return $result;
        }
        return $result;
    }

    function content()
    {
        if (empty($this->result)) {
            return false;
        }
        if (empty($this->result->value)) {
            return null;
        }
        return $this->result->value;
    }

    function isVisible()
    {
        if (empty($this->result)) {
            return false;
        }
        if (empty($this->result->visible)) {
            return false;
        }
        return $this->result->visible;
    }

    private function searchInValue($value, $needle, $column = 'name')
    {

        $index = array_search($needle, array_column($value, $column));

        if (is_bool($index) && !$index) {
            return false;
        }
        return $value[$index];
    }
}
